npm run build
git add dist -f
git commit -m "deployment"
git subtree push --prefix dist origin gh-pages