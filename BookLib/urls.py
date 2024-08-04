# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('delete/<int:book_id>/', views.delete_book, name='delete_book'),
]
