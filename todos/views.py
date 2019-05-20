from rest_framework import generics

from .models import Todo
from .serializers import TodoSerializer
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class ListTodo(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class DetailTodo(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class AddTodo(generics.GenericAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        serializer.is_valid()
        data = serializer.data
        t = Todo(title=data['title'], description=data['description'])
        t.save()
        request.data['id'] = t.pk
        return Response(request.data, status=status.HTTP_201_CREATED)
        