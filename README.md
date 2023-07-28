# react-comments-section

## To get it working with the `ai-blog` repo

```
$ npm run build
$ npm pack
```

Then move the tar file over to the `lib/react-comments-section/` directory

> There might be issues with the changes not reflecting when building the file. This could be due to the outputted files not overwriting existing files. Try deleting the generated `dist/` directory that is created by the npm run build command to get this to work


> [!WARNING]  
> Do not use `yarn` with this project only `npm`!!

## Dev Env
To develop faster, 
1. run 
    ```
    yarn link
    ```
    in this repo
1. Then go to the repository that wants to use this project as a dependency and run
    ```
    yarn link react-comments-section
    ```
1. Then, on each additional change made to this package, make sure to run `npm run build` to have changes reflected on the parent project
