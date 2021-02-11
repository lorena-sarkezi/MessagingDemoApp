CREATE TABLE [msg_demo].[messages]
(
	[message_id] INT NOT NULL IDENTITY,
	[customer_id] INT NOT NULL,
	[file_name] NVARCHAR(50) NOT NULL,
	[datetime_sent] DATETIME2(3) NOT NULL,
	
	CONSTRAINT message_pk PRIMARY KEY (message_id),
	CONSTRAINT customer_fk FOREIGN KEY (customer_id) REFERENCES msg_demo.customers (customer_id)
	--CONSTRAINT customer_fk_unique UNIQUE (customer_fk)
)
