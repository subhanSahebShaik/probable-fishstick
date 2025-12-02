"""
URL configuration for threadModel project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from threadApp import views as threads

urlpatterns = [
    path('admin/', admin.site.urls),

    # SECURE COOKIE AUTH
    path("api/auth/login/", threads.cookie_login, name="cookie_login"),
    path("api/auth/refresh/", threads.cookie_refresh, name="cookie_refresh"),
    path("api/auth/check/", threads.auth_check, name="auth_check"),

    # Thread API
    path("api/thread/nodes/", threads.thread_nodes),
    path("api/thread/nodes/<uuid:pk>/", threads.thread_node_detail),

    path("api/thread/edges/", threads.thread_edges),
    path("api/thread/edges/<uuid:pk>/", threads.thread_edge_detail),
]
