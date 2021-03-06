from rest_framework import serializers
from order.models import Item, Order, OrderItem, AdItem, ItemDetailImg


class ItemSerializer(serializers.ModelSerializer):
    images = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field="image_url")

    class Meta:
        model = Item
        fields = ("id",
                  "title",
                  "slug",
                  "descriptions",
                  "adult_price",
                  "children_price",
                  "route_code",
                  "trip_duration",
                  "from_city",
                  "to_city",
                  "start_date",
                  "img",
                  "terms_conditions",
                  "images"
                  )


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            'id',
            'order_items',
            'coupon'
        )

    def get_order_items(self, obj):
        return OrderItemSerializer(obj.items.all(), many=True).data


class OrderItemSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = (
            'id',
            'item',
            'quantity',
            'final_price'
        )

    def get_item(self, obj):
        return ItemSerializer(obj.item).data

    def get_final_price(self, obj):
        return obj.get_final_price()


class AdItemSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()

    class Meta:
        model = AdItem
        fields = ("id",
                  "title",
                  "item",
                  "brief",
                  "adImage"
                  )

    def get_item(self, obj):
        return ItemSerializer(obj.item).data
