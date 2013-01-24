lightsaber
==========

An elegant weapon, for a more civilized age.

Some helpful tips:

install node with homebrew

        brew install node

an error might occur when trying to symlink into your path, if you use a .bashrc or .bash_profile, add the following lines to that file.
  
        export NODE_PATH="/usr/local/lib/node"
        export PATH="/usr/local/share/npm/bin:$PATH"

if you don't have a .bashrc or .bash_profile file, you should! But just copy/past the same lines into the terminal (not sure if you will have to do this every time...)

once that is up and running, get nice little npm package for launching the app and running locally,
  
        npm install nodemon -g

once that is all good to go, you can launch the app by typing:
  
        nodemon app.js

the app should now be running at localhost:8888!