import os
import json
import subprocess
import datetime
import platform
from pathlib import Path

def run_command(command, shell=True):
    """Run a shell command and return the output."""
    try:
        result = subprocess.run(command, shell=shell, capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error running command '{command}': {e.stderr}")
        return ""

def get_python_dependencies(backend_path):
    """Get list of Python dependencies from requirements.txt."""
    req_file = Path(backend_path) / "requirements.txt"
    if not req_file.exists():
        return []
    
    with open(req_file, "r") as f:
        deps = [line.strip() for line in f if line.strip() and not line.startswith("#")]
    return sorted(deps)

def get_node_dependencies(frontend_path):
    """Get list of Node.js dependencies from package.json."""
    pkg_file = Path(frontend_path) / "package.json"
    if not pkg_file.exists():
        return []
    
    with open(pkg_file, "r") as f:
        pkg_data = json.load(f)
    
    deps = []
    for dep_type in ["dependencies", "devDependencies"]:
        if dep_type in pkg_data:
            deps.extend([f"{dep}@{pkg_data[dep_type][dep]}" for dep in pkg_data[dep_type]])
    return sorted(deps)

def get_git_diff():
    """Get git diff to detect changes in requirements.txt or package.json."""
    diff = run_command("git diff --cached")
    if not diff:
        diff = run_command("git diff")
    return diff

def generate_change_summary(diff):
    """Generate a short summary of changes based on git diff."""
    if "requirements.txt" in diff:
        return "Updated Python dependencies in requirements.txt."
    elif "package.json" in diff:
        return "Updated Node.js dependencies in package.json."
    return "Updated project dependencies."

def update_readme(backend_path, frontend_path, readme_path):
    """Update README.md with dependencies and change log."""
    # Get current dependencies
    python_deps = get_python_dependencies(backend_path)
    node_deps = get_node_dependencies(frontend_path)
    
    # Get change summary
    diff = get_git_diff()
    change_summary = generate_change_summary(diff) if diff else None
    
    # Read existing README content
    readme_file = Path(readme_path)
    if readme_file.exists():
        with open(readme_file, "r") as f:
            content = f.readlines()
    else:
        content = ["# Project README\n\n"]

    # Prepare new content
    new_content = []
    in_deps_section = False
    in_changes_section = False
    skip_rest = False

    for line in content:
        if line.strip() == "## Dependencies":
            in_deps_section = True
            new_content.append(line)
            new_content.append("### Python Dependencies\n")
            new_content.append("| Package | Installation Command | Source |\n")
            new_content.append("|---------|---------------------|--------|\n")
            for dep in python_deps:
                new_content.append(f"| {dep} | `pip install {dep}` | [PyPI](https://pypi.org/project/{dep.split('==')[0]}/) |\n")
            new_content.append("\n### Node.js Dependencies\n")
            new_content.append("| Package | Installation Command | Source |\n")
            new_content.append("|---------|---------------------|--------|\n")
            for dep in node_deps:
                pkg_name = dep.split("@")[0]
                new_content.append(f"| {dep} | `npm install {dep}` | [npm](https://www.npmjs.com/package/{pkg_name}) |\n")
            new_content.append("\n")
            skip_rest = True
        elif line.strip() == "## Recent Changes":
            in_changes_section = True
            new_content.append(line)
            if change_summary:
                current_date = datetime.datetime.now().strftime("%Y-%m-%d")
                new_content.append(f"- {current_date}: {change_summary}\n")
            skip_rest = True
        elif not in_deps_section and not in_changes_section:
            new_content.append(line)
        elif skip_rest:
            continue
        else:
            new_content.append(line)

    # If sections don't exist, append them
    if not in_deps_section:
        new_content.append("## Dependencies\n")
        new_content.append("### Python Dependencies\n")
        new_content.append("| Package | Installation Command | Source |\n")
        new_content.append("|---------|---------------------|--------|\n")
        for dep in python_deps:
            new_content.append(f"| {dep} | `pip install {dep}` | [PyPI](https://pypi.org/project/{dep.split('==')[0]}/) |\n")
        new_content.append("\n### Node.js Dependencies\n")
        new_content.append("| Package | Installation Command | Source |\n")
        new_content.append("|---------|---------------------|--------|\n")
        for dep in node_deps:
            pkg_name = dep.split("@")[0]
            new_content.append(f"| {dep} | `npm install {dep}` | [npm](https://www.npmjs.com/package/{pkg_name}) |\n")
        new_content.append("\n")

    if not in_changes_section and change_summary:
        new_content.append("## Recent Changes\n")
        current_date = datetime.datetime.now().strftime("%Y-%m-%d")
        new_content.append(f"- {current_date}: {change_summary}\n\n")

    # Write updated content to README
    with open(readme_file, "w") as f:
        f.writelines(new_content)

def main():
    # Define project paths (adjust as needed)
    project_root = Path.cwd()
    backend_path = project_root / "backend"
    frontend_path = project_root / "frontend"
    readme_path = project_root / "README.md"

    # Ensure paths exist
    if not backend_path.exists() or not frontend_path.exists():
        print("Error: backend or frontend directory not found.")
        return

    # Update requirements.txt if new Python packages are installed
    if platform.system() in ["Windows", "Linux", "Darwin"]:
        pip_freeze = run_command("pip freeze")
        with open(backend_path / "requirements.txt", "w") as f:
            f.write(pip_freeze)

    # Update package.json (optional: run npm install to ensure lockfile is updated)
    if (frontend_path / "package.json").exists():
        os.chdir(frontend_path)
        run_command("npm install")
        os.chdir(project_root)

    # Update README
    update_readme(backend_path, frontend_path, readme_path)
    print("README.md updated successfully.")

if __name__ == "__main__":
    main()