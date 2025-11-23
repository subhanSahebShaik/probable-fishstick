from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import ThreadNode, ThreadEdge
from .serializers import ThreadNodeSerializer, ThreadEdgeSerializer


# ======== THREAD NODES ========
@api_view(["GET", "POST"])
def thread_nodes(request):
    if request.method == "GET":
        nodes = ThreadNode.objects.all().order_by("-timestamp")
        return Response(ThreadNodeSerializer(nodes, many=True).data)

    elif request.method == "POST":
        serializer = ThreadNodeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def thread_node_detail(request, pk):
    try:
        node = ThreadNode.objects.get(pk=pk)
    except ThreadNode.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(ThreadNodeSerializer(node).data)

    elif request.method == "PUT":
        serializer = ThreadNodeSerializer(
            node, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        node.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
def thread_edges(request):
    if request.method == "GET":
        edges = ThreadEdge.objects.all()
        return Response(ThreadEdgeSerializer(edges, many=True).data)

    elif request.method == "POST":
        serializer = ThreadEdgeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
def thread_edge_detail(request, pk):
    try:
        edge = ThreadEdge.objects.get(pk=pk)
    except ThreadEdge.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        serializer = ThreadEdgeSerializer(
            edge, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        edge.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
