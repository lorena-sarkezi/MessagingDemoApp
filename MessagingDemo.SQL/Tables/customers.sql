CREATE TABLE [ap_demo].[customers]
(
	[customer_id] INT NOT NULL IDENTITY, 
    [full_name] NVARCHAR(64) NOT NULL, 
    [phone_number] NVARCHAR(16) NOT NULL UNIQUE,

    CONSTRAINT customer_pk PRIMARY KEY ([customer_id])

)
