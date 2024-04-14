# Image Upload Server
A simple website to upload images to and share them with other people. 


### Tech Stack
- Next.js
- Postgres (Vercel Database)
- Tailwind CSS
- Drizzle ORM
- Amazon S3 Buckets


## Get Started

This has been desgined to be deployed on vercel. Just click the button to create the server. You will need to have created an S3 bucket and generated access keys.


[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmember87%2Fimage-upload-server)

### Setting environment variables


| First Header  | Second Header |
| ------------- | ------------- |
| API_KEY  | Key required to upload images |
| BUCKET_NAME  | Amazon S3 bucket name  |
| AWS_ACCESS_KEY_ID  | Amazon Access Key ID  |
| AWS_SECRET_ACCESS_KEY  | Amazon Secret Access Key  |
| AWS_REGION  | Amazon Bucket Region  |
| DATABASE_URL  | Postgres database URL  |
| APP_URL  | APP URL  |

## Linux Command
You can run a command to upload screenshots from Linux directly to the server. 

### Requirements
- [maim](https://github.com/naelstrof/maim)
- [jq](https://github.com/jqlang/jq)
- [curl](https://github.com/curl/curl)
- [xclip](https://github.com/astrand/xclip)


Replace API_KEY and domain in the following command and the URL of the uploaded image will be copied to your clipboard.
  
``maim -s | base64 | jq --slurp -R '{input: ., "key": "<API_KEY>"}' | curl -X POST -d @- https://<DOMAIN>/api/v1/screenshot | jq -r '.url' | xclip -selection c``

## Stargazers over time
[![Stargazers over time](https://starchart.cc/member87/image-upload-server.svg?variant=adaptive)](https://starchart.cc/member87/image-upload-server)

