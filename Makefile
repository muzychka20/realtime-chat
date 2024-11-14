run: run-android run-ios

run-adroid:
	cd app && npm run android

run-ios:
	cd app && npm run ios -- --simulator='iPhone 13'

server:
	. env/bin/activate && cd api && python manage.py runserver
