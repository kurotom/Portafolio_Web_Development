from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime
# Create your models here.

class User(AbstractUser):
    pass


class mywallet(models.Model):
    class Meta:
        verbose_name_plural = "Wallet"

    userID = models.IntegerField(blank=True, null=True)
    username = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name="User_Wallet")
    nameWallet = models.CharField(max_length=64, blank=True, null=True)
    amount = models.FloatField(blank=True, null=True)
    date = models.CharField(max_length=27, blank=True, null=True)

    def to_json(self):
        date = datetime.fromisoformat(self.date)
        dateFormated = date.strftime('%Y/%m/%d %H:%M:%S')
        return {
            "id": self.userID,
            "username": self.username.username,
            "nameWallet": self.nameWallet,
            "walletID": self.id,
            "amount": self.amount,
            "date": dateFormated
        }

    def __str__(self):
        return f'ID: {self.id}, Username: {self.username}, UserID: {self.userID}, Wallet: {self.nameWallet}, Amount: $ {self.amount}, Create: {self.date}'


class ops(models.Model):
    class Meta:
        verbose_name_plural = 'Operations'

    op = models.CharField(max_length=4, blank=True, null=True)
    walletID = models.IntegerField(blank=True, null=True)
    walletName = models.ForeignKey(mywallet, on_delete=models.CASCADE, blank=True, related_name="Wallet_Name")
    username = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, related_name="User_Operations")
    amount = models.FloatField(blank=True, null=True)
    date = models.CharField(max_length=27, blank=True, null=True)

    def to_json(self):
        date = datetime.fromisoformat(self.date)
        dateFormated = date.strftime('%Y/%m/%d %H:%M:%S')

        return {
            'id': self.id,
            'op': self.op,
            'user': self.username.id,
            'username': self.username.username,
            'amount': self.amount,
            'wallet': self.walletID,
            'walletName': self.walletName.nameWallet,
            'date': dateFormated
        }

    def __str__(self):
        return f'Id: {self.id}, Username: {self.username}, Amount: {self.amount}, Date: {self.date}'
