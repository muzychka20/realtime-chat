import json
from asgiref.sync import async_to_async
from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        user = self.scope['user']
        print(user, user.is_authenticated)
        if not user.is_authenticated:
            return
        # Save username to use as a group name for this user
        self.username = user.username        
        # Join this user to a group with their username
        async_to_async(self.channel_layer.group_add)(
            self.username, self.channel_name
        )
        self.accept()
        
        
    def disconnect(self, close_code):
        # Leave room/group
        async_to_async(self.channel_layer.group_discard)(
            self.username, self.channel_name
        )
        
        
    #---------------------        
    #   Handle requests
    #---------------------        
    def receive(self, text_data):
        # Receive message from websocket
        data = json.loads(text_data)
        # Pretty print   python dict
        print('receive', json.dumps(data, index=2))
        