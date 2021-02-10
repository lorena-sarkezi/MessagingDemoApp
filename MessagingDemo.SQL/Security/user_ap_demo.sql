CREATE USER [ap_demo]
	FOR LOGIN [ap_demo]
GO

GRANT CONNECT TO [ap_demo]
GO

GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA :: [ap_demo] TO [ap_demo]
GO

