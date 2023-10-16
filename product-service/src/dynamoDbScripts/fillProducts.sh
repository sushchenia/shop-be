aws dynamodb put-item \
 --table-name products \
 --item '{
 "id": {"S": "6fc27dcf-8579-44e7-9f55-9815f4a3f834"},
 "title": {"S": "Robusta"},
 "price": {"N": "5"},
 "description": {"S": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."} }' \
--return-consumed-capacity TOTAL

aws dynamodb put-item \
 --table-name products \
 --item '{
 "id": {"S": "37e8239d-c1b1-4b38-9ae8-fce71e42318c"},
 "title": {"S": "Arabica"},
 "price": {"N": "9"},
 "description": {"S": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."} }' \
--return-consumed-capacity TOTAL

aws dynamodb put-item \
 --table-name products \
 --item '{
 "id": {"S": "d8bf9497-ff8a-44e6-81fc-e5a94ab75c4e"},
 "title": {"S": "Liberica"},
 "price": {"N": "7"},
 "description": {"S": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."} }' \
--return-consumed-capacity TOTAL

aws dynamodb put-item \
 --table-name products \
 --item '{
 "id": {"S": "90812e88-4b00-4550-b976-138c73655ddc"},
 "title": {"S": "Excelsa"},
 "price": {"N": "8"},
 "description": {"S": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."} }' \
--return-consumed-capacity TOTAL



