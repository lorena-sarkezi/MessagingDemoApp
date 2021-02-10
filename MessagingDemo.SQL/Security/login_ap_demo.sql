CREATE LOGIN ap_demo 
    WITH PASSWORD    = N'ap_demo',
    CHECK_POLICY     = OFF,
    CHECK_EXPIRATION = OFF;
GO
EXEC sp_addsrvrolemember 
    @loginame = N'ap_demo', 
    @rolename = N'sysadmin';
