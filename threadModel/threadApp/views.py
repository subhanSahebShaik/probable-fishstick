from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import ThreadNode, ThreadEdge
from .serializers import ThreadNodeSerializer, ThreadEdgeSerializer
from .authentication import CookieJWTAuthentication

# ============================
# THREAD NODES
# ============================


@api_view(["GET", "POST"])
@authentication_classes([CookieJWTAuthentication])
@permission_classes([IsAuthenticated])
def thread_nodes(request):
    if request.method == "GET":
        nodes = ThreadNode.objects.all().order_by("-timestamp")
        return Response(ThreadNodeSerializer(nodes, many=True).data)

    serializer = ThreadNodeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
@authentication_classes([CookieJWTAuthentication])
@permission_classes([IsAuthenticated])
def thread_node_detail(request, pk):
    try:
        node = ThreadNode.objects.get(pk=pk)
    except ThreadNode.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(ThreadNodeSerializer(node).data)

    if request.method == "PUT":
        serializer = ThreadNodeSerializer(
            node, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    node.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# ============================
# THREAD EDGES
# ============================

@api_view(["GET", "POST"])
@authentication_classes([CookieJWTAuthentication])
@permission_classes([IsAuthenticated])
def thread_edges(request):
    if request.method == "GET":
        edges = ThreadEdge.objects.all()
        return Response(ThreadEdgeSerializer(edges, many=True).data)

    serializer = ThreadEdgeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
@authentication_classes([CookieJWTAuthentication])
@permission_classes([IsAuthenticated])
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

    edge.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# ============================
# AUTHENTICATION
# ============================

@api_view(["POST"])
def cookie_login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if not user:
        return Response({"error": "Invalid credentials"}, status=400)

    refresh = RefreshToken.for_user(user)
    access = refresh.access_token

    response = Response({"status": "ok"})

    response.set_cookie(
        "access_token", str(access),
        httponly=True, secure=True, samesite="None",
        max_age=3600, path="/"
    )

    response.set_cookie(
        "refresh_token", str(refresh),
        httponly=True, secure=True, samesite="None",
        max_age=86400, path="/"
    )

    return response


@api_view(["POST"])
def cookie_refresh(request):
    refresh_token = request.COOKIES.get("refresh_token")
    if not refresh_token:
        return Response({"error": "no refresh"}, status=400)

    try:
        refresh = RefreshToken(refresh_token)
        access = refresh.access_token

        response = Response({"success": True})
        response.set_cookie(
            "access_token", str(access),
            httponly=True, secure=True, samesite="None",
            max_age=3600, path="/"
        )

        return response

    except Exception:
        return Response({"error": "invalid refresh"}, status=400)


@api_view(["GET"])
@authentication_classes([CookieJWTAuthentication])
@permission_classes([IsAuthenticated])
def auth_check(request):
    return Response({"ok": True})
