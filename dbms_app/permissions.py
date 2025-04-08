from rest_framework import permissions
from .models import UserEntityPermission

class IsSuperUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser

def has_entity_permission(entity_type):
    class HasSpecificEntityPermission(permissions.BasePermission):
        def has_permission(self, request, view):
            if request.user.is_superuser:
                return True
                
            try:
                permission = UserEntityPermission.objects.get(user=request.user, entity_type=entity_type)
                if request.method in permissions.SAFE_METHODS:
                    return permission.can_view
                elif request.method == 'POST':
                    return permission.can_create
                elif request.method == 'PUT' or request.method == 'PATCH':
                    return permission.can_edit
                elif request.method == 'DELETE':
                    return permission.can_delete
                return False
            except UserEntityPermission.DoesNotExist:
                return False
    
    return HasSpecificEntityPermission