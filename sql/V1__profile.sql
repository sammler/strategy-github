CREATE TABLE public.profile
(
    profile_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    github_id integer NOT NULL,
    followers integer NOT NULL,
    following integer NOT NULL,
    public_repos integer NOT NULL,
    public_gists integer NOT NULL,
    created_at date NOT NULL,
    updated_at date,
    CONSTRAINT profile_pkey PRIMARY KEY (github_id, profile_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.profile
    OWNER to postgres;
