/* Replace with your SQL commands */

-- install EXTENSION for uuid 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Table: public.flm_accounts

-- Table: public.flm_accounts

-- DROP TABLE IF EXISTS public.flm_accounts;

CREATE TABLE IF NOT EXISTS public.flm_accounts
(
    id text COLLATE pg_catalog."default" NOT NULL DEFAULT uuid_generate_v1(),
    name text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    token text COLLATE pg_catalog."default",
    created_at text COLLATE pg_catalog."default" DEFAULT to_char(CURRENT_TIMESTAMP, 'YYYY-MM-DD HH:mm:ss AM TZ'::text),
    type text COLLATE pg_catalog."default" DEFAULT 'user'::text,
    status text COLLATE pg_catalog."default" DEFAULT 'active'::text,
    CONSTRAINT acc_primary_key PRIMARY KEY (id),
    CONSTRAINT acc_unique_email UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.flm_accounts
    OWNER to postgres;
