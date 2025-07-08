from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from PIL import Image
import torch
import torchvision.transforms as transforms
from torchvision import models
import json

class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({"message": "User created successfully"}, status=201)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@csrf_exempt
def quick_meal(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            prompt = data.get("prompt", "")
            return JsonResponse({"meal": f"Quick meal suggestion based on: {prompt}"})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid method"}, status=405)


@csrf_exempt
def weekly_meal(request):
    if request.method == "POST":
        return JsonResponse({
            "week": [
                "Monday: Grilled Chicken Salad",
                "Tuesday: Lentil Soup",
                "Wednesday: Veggie Stir Fry",
                "Thursday: Quinoa Bowl",
                "Friday: Chickpea Curry",
                "Saturday: Pasta Primavera",
                "Sunday: Baked Salmon with Veggies"
            ]
        })
    return JsonResponse({"error": "Invalid method"}, status=405)


@api_view(['POST'])
def ai_menu_filter(request):
    user_query = request.data.get('query', '')

    sample_response = {
        "items": [
            {"name": "Cheesy Corn Tacos", "price": 180},
            {"name": "Mini Cheese Garlic Bread", "price": 150},
            {"name": "Cheese Burst Dosa", "price": 190}
        ]
    }

    return Response(sample_response)


@api_view(['POST'])
def parse_voice_order(request):
    transcript = request.data.get('text', '')

    parsed_order = {
        "items": [
            {"name": "garlic naan", "quantity": 2},
            {"name": "butter chicken", "quantity": 1, "note": "spicy"}
        ]
    }

    return Response(parsed_order)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def image_food_search(request):
    if 'image' not in request.FILES:
        return Response({'error': 'Image not provided'}, status=400)

    try:
        image_file = request.FILES['image']
        image = Image.open(image_file).convert('RGB')

        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
        ])
        input_tensor = transform(image).unsqueeze(0)

        model = models.mobilenet_v2(pretrained=True)
        model.eval()

        with torch.no_grad():
            outputs = model(input_tensor)

        predicted_idx = torch.argmax(outputs[0]).item()

        food_labels = {
            954: 'cheeseburger',
            937: 'pizza',
            924: 'guacamole',
            963: 'samosa'
        }

        predicted_food = food_labels.get(predicted_idx, "Unknown food item")

        return Response({
            "match": predicted_food,
            "confidence": float(torch.max(torch.nn.functional.softmax(outputs[0], dim=0)))
        })

    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def generate_offer_message(request):
    user_name = request.data.get('name', 'there')

    message = f"Hey {user_name}, we miss you! Here's ₹100 off your next order. Come back soon!"

    return Response({"message": message})