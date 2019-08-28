from django.conf import settings
from django.db import models
from django_countries.fields import CountryField


# Items Model(Tour Trips)
class Item(models.Model):

    title = models.CharField(max_length=200)
    slug = models.SlugField()
    descriptions = models.CharField(max_length=20000)
    adult_price = models.FloatField()
    children_price = models.FloatField()
    route_code = models.CharField(max_length=20, blank=True, null=True)
    trip_duration = models.IntegerField(null=True)
    from_city = models.CharField(max_length=100)
    to_city = models.CharField(max_length=100)
    start_date = models.DateField()
    img = models.ImageField()
    terms_conditions = models.CharField(max_length=2000)

    def __str__(self):
        return self.title


# order item in shopping cart
class OrderItem(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.item.title}"

    def get_final_price(self):
        return 133


# manage ordered order
class Order(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    ref_code = models.CharField(max_length=20, blank=True, null=True)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)
    shipping_address = models.ForeignKey(
        'Address', related_name='shipping_address', on_delete=models.SET_NULL, blank=True, null=True)
    billing_address = models.ForeignKey(
        'Address', related_name='billing_address', on_delete=models.SET_NULL, blank=True, null=True)
    payment = models.ForeignKey(
        'Payment', on_delete=models.SET_NULL, blank=True, null=True)
    coupon = models.ForeignKey(
        'Coupon', on_delete=models.SET_NULL, blank=True, null=True)
    being_delivered = models.BooleanField(default=False)
    received = models.BooleanField(default=False)
    refund_requested = models.BooleanField(default=False)
    refund_granted = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


# addressed model
ADDRESS_CHOICES = (
    ('B', 'Billing'),
    ('S', 'Shipping'),
)


class Address(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    street_address = models.CharField(max_length=100)
    apartment_address = models.CharField(max_length=100)
    country = CountryField(multiple=False)
    zip_code = models.CharField(max_length=100)
    address_type = models.CharField(max_length=1, choices=ADDRESS_CHOICES)
    default = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name_plural = 'Addresses'


# payment model
class Payment(models.Model):

    stripe_charge_id = models.CharField(max_length=50)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.SET_NULL, blank=True, null=True)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

# coupon


class Coupon(models.Model):

    code = models.CharField(max_length=15)
    amount = models.FloatField()

    def __str__(self):
        return self.code


# manage refund
class Refund(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    reason = models.TextField()
    accepted = models.BooleanField(default=False)
    email = models.EmailField()

    def __str__(self):
        return f"{self.pk}"

# homepage slider data


class AdItem(models.Model):
    item = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='AdItem')
    adImage = models.ImageField()
    title = models.CharField(max_length=30)
    brief = models.CharField(max_length=150)

    def __str__(self):
        return self.title

# Trip detail images for detail page


class ItemDetailImg(models.Model):
    item = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField()
