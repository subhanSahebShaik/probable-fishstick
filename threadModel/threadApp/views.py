from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .models import ThreadNode, ThreadEdge
from .serializers import ThreadNodeSerializer, ThreadEdgeSerializer


# =========================================
# LOGIN (Set Cookies)
# =========================================
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

    # ACCESS TOKEN
    response.set_cookie(
        "access_token",
        str(access),
        httponly=True,
        secure=True,
        samesite="None",
        path="/",
        max_age=3600,
    )

    # REFRESH TOKEN
    response.set_cookie(
        "refresh_token",
        str(refresh),
        httponly=True,
        secure=True,
        samesite="None",
        path="/",
        max_age=24 * 3600,
    )

    return response


# =========================================
# REFRESH ENDPOINT
# =========================================
@api_view(["POST"])
def cookie_refresh(request):
    refresh_token = request.COOKIES.get("refresh_token")

    if refresh_token is None:
        return Response({"error": "No refresh token"}, status=400)

    try:
        refresh = RefreshToken(refresh_token)
        access = refresh.access_token

        response = Response({"success": True})
        response.set_cookie(
            "access_token",
            str(access),
            httponly=True,
            secure=True,
            samesite="None",
            path="/",
            max_age=3600,
        )
        return response

    except Exception:
        return Response({"error": "Invalid refresh token"}, status=400)


# =========================================
# AUTH CHECK (Protected)
# =========================================
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def auth_check(request):
    return Response({"ok": True})


# =========================================
# PROTECTED THREAD NODE APIs
# =========================================
@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def thread_nodes(request):
    if request.method == "GET":
        nodes = ThreadNode.objects.all().order_by("-timestamp")
        return Response(ThreadNodeSerializer(nodes, many=True).data)

    elif request.method == "POST":
        serializer = ThreadNodeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(["GET", "PUT", "DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def thread_node_detail(request, pk):
    try:
        node = ThreadNode.objects.get(pk=pk)
    except ThreadNode.DoesNotExist:
        return Response(status=404)

    if request.method == "GET":
        return Response(ThreadNodeSerializer(node).data)

    elif request.method == "PUT":
        serializer = ThreadNodeSerializer(
            node, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == "DELETE":
        node.delete()
        return Response(status=204)


# =========================================
# PROTECTED THREAD EDGE APIs
# =========================================
@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def thread_edges(request):
    if request.method == "GET":
        edges = ThreadEdge.objects.all()
        return Response(ThreadEdgeSerializer(edges, many=True).data)

    elif request.method == "POST":
        serializer = ThreadEdgeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(["PUT", "DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def thread_edge_detail(request, pk):
    try:
        edge = ThreadEdge.objects.get(pk=pk)
    except ThreadEdge.DoesNotExist:
        return Response(status=404)

    if request.method == "PUT":
        serializer = ThreadEdgeSerializer(
            edge, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == "DELETE":
        edge.delete()
        return Response(status=204)
