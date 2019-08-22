from django.urls import path
from .views import ItemListView, AddToCart, OrderDetailView

urlpatterns = [
    path('item-list/', ItemListView.as_view(), name='item_list'),
    path('add-to-cart/', AddToCart.as_view(), name='add_to_cart'),
    path('summary/', OrderDetailView.as_view(), name='summary')
]
