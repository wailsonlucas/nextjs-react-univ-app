--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: home1_demands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.home1_demands (
    id integer NOT NULL,
    title character varying(20) NOT NULL,
    status character varying(20) DEFAULT 'pending'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_nom character varying(20) NOT NULL,
    doc_date character varying(50) NOT NULL
);


ALTER TABLE public.home1_demands OWNER TO postgres;

--
-- Name: demands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.demands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.demands_id_seq OWNER TO postgres;

--
-- Name: demands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.demands_id_seq OWNED BY public.home1_demands.id;


--
-- Name: home1_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.home1_users (
    id integer NOT NULL,
    n_inscription character varying(20) NOT NULL,
    nom character varying(20) NOT NULL,
    prenom character varying(20) NOT NULL,
    date_n_time_birth character varying(20) NOT NULL,
    national_id character varying(20) NOT NULL,
    date_publication character varying(20) NOT NULL,
    a_propos character varying(20) NOT NULL,
    adresse character varying(20) NOT NULL,
    specialite character varying(20) NOT NULL,
    role character varying(10) DEFAULT 'user'::character varying
);


ALTER TABLE public.home1_users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.home1_users.id;


--
-- Name: home1_demands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.home1_demands ALTER COLUMN id SET DEFAULT nextval('public.demands_id_seq'::regclass);


--
-- Name: home1_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.home1_users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: home1_demands; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.home1_demands (id, title, status, created_at, user_nom, doc_date) FROM stdin;
4	demo-title	pending	2024-05-29 03:56:06.868748	demo	2024-04-30T23:00:00.000Z
5	demo-title	pending	2024-05-29 10:38:56.349103	yassine	2024-05-08T23:00:00.000Z
6	demo-title	pending	2024-05-29 10:39:05.652585	yassine	2024-05-02T23:00:00.000Z
7	demo-title	pending	2024-05-29 10:39:17.90053	yassine	2024-05-14T23:00:00.000Z
\.


--
-- Data for Name: home1_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.home1_users (id, n_inscription, nom, prenom, date_n_time_birth, national_id, date_publication, a_propos, adresse, specialite, role) FROM stdin;
5	1	demo	man	1	1	1	1	1	1	user
4	1	yassine	hamza	1	1	1	1	1	1	admin
\.


--
-- Name: demands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.demands_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: home1_demands demands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.home1_demands
    ADD CONSTRAINT demands_pkey PRIMARY KEY (id);


--
-- Name: home1_users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.home1_users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

