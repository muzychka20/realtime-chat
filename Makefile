# run: run-android run-ios

run-android:
	call cd app && npm run android

m-run-android:
	cd app && npm run android

m-run-ios:
	cd app && npm run ios 

server:
	call .\env\Scripts\activate && python .\api\manage.py runserver

m-run-server:
	source venv/bin/activate && cd api && python3 manage.py runserver
