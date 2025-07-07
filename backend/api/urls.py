from django.urls import path
from .views import quick_meal, weekly_meal, RegisterView, LoginView

urlpatterns = [
    path('quick-meal/', quick_meal, name='quick_meal'),
    path('weekly-meal/', weekly_meal, name='weekly_meal'),

    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
