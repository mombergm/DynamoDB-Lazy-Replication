for attempt in {1..40}; do  aws --region eu-west-1 kinesis put-record --stream-name AVG-CASE-1378756051 --data This is Attempt 40 --partition-key 2 &>> /tmp/attempts.log & echo Attempt 40 Done; done
