from django.contrib import admin
from .models import (Item, Order, OrderItem, Address,
                     Coupon, Payment, Refund, AdItem)
# Register your models here.
admin.site.register(Item)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Address)
admin.site.register(Coupon)
admin.site.register(Payment)
admin.site.register(Refund)
admin.site.register(AdItem)
