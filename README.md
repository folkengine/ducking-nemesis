# ducking-nemesis
How well can you duck from your nemesis?




Installing NPM with Homebrew
============================

We use some Node packages as a part of our Cucumber tests. In order to load these you will need to have NPM on your 
system. If you are using Homebrew, do the following. 

    rm -rf /usr/local/lib/node_modules
    brew uninstall node
    brew install node --without-npm
    echo prefix=~/.node >> ~/.npmrc
    curl -L https://www.npmjs.com/install.sh | sh
    
Then add to your ~/.bash_profile:

    export PATH="$HOME/.node/bin:$PATH"
    
From [https://gist.github.com/DanHerbert/9520689](https://gist.github.com/DanHerbert/9520689)
    