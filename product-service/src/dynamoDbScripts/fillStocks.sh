aws dynamodb put-item \
 --table-name stocks \
 --item '{
 "product_id": {"S": "6fc27dcf-8579-44e7-9f55-9815f4a3f834"},
 "count": {"N": "100"} }' \
--return-consumed-capacity TOTAL

aws dynamodb put-item \
 --table-name stocks \
 --item '{
 "product_id": {"S": "37e8239d-c1b1-4b38-9ae8-fce71e42318c"},
 "count": {"N": "200"} }' \
--return-consumed-capacity TOTAL

aws dynamodb put-item \
 --table-name stocks \
 --item '{
 "product_id": {"S": "d8bf9497-ff8a-44e6-81fc-e5a94ab75c4e"},
 "count": {"N": "150"} }' \
--return-consumed-capacity TOTAL

aws dynamodb put-item \
 --table-name stocks \
 --item '{
 "product_id": {"S": "90812e88-4b00-4550-b976-138c73655ddc"},
 "count": {"N": "300"} }' \
--return-consumed-capacity TOTAL



