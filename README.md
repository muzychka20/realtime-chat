## Generating and Managing Project Dependencies

The command 
```
pip freeze > requirements.txt
``` 
is used to generate a **requirements.txt** file that contains a list of all the installed Python packages in your current environment, along with their respective versions.


- **pip freeze** - This command lists all the installed packages in the current Python environment and their versions.
- **>** - This is a shell operator that redirects the output to a file.
- **requirements.txt** - This is the name of the file where the list of packages will be saved.

When you run this command, it creates (or overwrites) a **requirements.txt** file in your current directory with all the packages installed in your environment. You can later use this file to recreate the environment with the same dependencies using the command ```pip install -r requirements.txt```

## Steps to Start the Project After Cloning


Create the virtual environment:


```
python -m venv env  # or python3 for macOS/Linux
```

Activate the virtual environment:

Windows:
```
.\env\Scripts\activate
```

macOS/Linux:
```
source env/bin/activate
```

Install the dependencies from requirements.txt:
```
pip install -r requirements.txt
```

In app 
```
npm i
```

## Makefiel
Windows:
```
mingw32-make.exe Makefile run-android
```
