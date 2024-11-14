run: run-android run-ios

run-android:
	call cd app && npm run android

run-ios:
	call cd app && npm run ios -- --simulator='iPhone 13'

server:
	call .\env\Scripts\activate && python .\api\manage.py runserver

