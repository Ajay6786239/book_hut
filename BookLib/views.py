from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Book
from django.urls import reverse
from django.http import JsonResponse

def index(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        author = request.POST.get('author')
        des = request.POST.get('des')
        if title and author and des:
            book = Book.objects.create(title=title, author=author, des=des)
            return JsonResponse({
                'success': True,
                'id': book.id,
                'title': book.title,
                'author': book.author,
                'des': book.des
            })
        return JsonResponse({'success': False})

    books = Book.objects.all()
    return render(request, 'index.html', {'books': books})

def delete_book(request, book_id):
    if request.method == 'DELETE':
        book = Book.objects.get(id=book_id)
        book.delete()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False})

