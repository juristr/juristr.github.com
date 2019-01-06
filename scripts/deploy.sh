# remove previous publication
SHA=$(git rev-parse HEAD)
GIT_USER_ARGS="-c user.name='juristr' -c user.email='juri.strumpflohner@gmail.com'"

echo "cleaning up previous deploy"
rm -rf public
mkdir public

echo "creating master branch in public folder"
# clone master branch from the local repo into a repo located within "public"
git clone .git --branch master public

echo "generating hugo files"

hugo version

# generate
hugo
  
# echo "Verifying GitHub keys"
# if [ ! -n "$(grep "^github.com " ~/.ssh/known_hosts)" ]; then 
#     ssh-keyscan github.com >> ~/.ssh/known_hosts 2>/dev/null; 
# fi; 

# ssh-agent bash -c "ssh-add /path/to/your/deploy/id_rsa; git clone -b master git@github.com:githubAccount/githubRepo.git /your/target/dir

echo "pushing changes back up to GitHub"
# commit the changes in the clone and push them back to the local master branch    
git -C public add --all
git -C public $GIT_USER_ARGS commit -am "CircleCI auto-publishing changes ($SHA)"
git -C public push -f git@github.com:juristr/juristr.github.com.git master