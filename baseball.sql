--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: auth_tokens; Type: TABLE; Schema: public; Owner: codybarber
--

CREATE TABLE auth_tokens (
    id integer NOT NULL,
    statter_id integer,
    auth_token text
);


ALTER TABLE auth_tokens OWNER TO codybarber;

--
-- Name: auth_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: codybarber
--

CREATE SEQUENCE auth_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE auth_tokens_id_seq OWNER TO codybarber;

--
-- Name: auth_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codybarber
--

ALTER SEQUENCE auth_tokens_id_seq OWNED BY auth_tokens.id;


--
-- Name: batting; Type: TABLE; Schema: public; Owner: codybarber
--

CREATE TABLE batting (
    id integer NOT NULL,
    player_id integer,
    "AB" integer,
    "PA" integer DEFAULT 0,
    "H" integer,
    "BB" integer,
    "SO" integer,
    "HR" integer,
    doubles integer,
    triples integer,
    "G" integer,
    "R" integer,
    "BA" double precision DEFAULT '0'::double precision,
    "OBP" double precision DEFAULT '0'::double precision,
    "SLG" double precision DEFAULT '0'::double precision,
    "OPS" double precision DEFAULT '0'::double precision,
    "SB" integer,
    "RBI" integer,
    "CS" integer,
    sacrifices integer,
    "HBP" integer,
    ground_balls integer,
    fly_balls integer,
    line_drives integer,
    singles integer,
    "IBB" integer,
    "BABIP" double precision DEFAULT '0'::double precision,
    "BBperc" double precision DEFAULT '0'::double precision,
    "SOperc" double precision DEFAULT '0'::double precision,
    "ISO" double precision DEFAULT '0'::double precision,
    "RC" double precision DEFAULT '0'::double precision,
    "wOBA" double precision DEFAULT '0'::double precision,
    "wRAA" double precision DEFAULT '0'::double precision
);


ALTER TABLE batting OWNER TO codybarber;

--
-- Name: batting_id_seq; Type: SEQUENCE; Schema: public; Owner: codybarber
--

CREATE SEQUENCE batting_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE batting_id_seq OWNER TO codybarber;

--
-- Name: batting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codybarber
--

ALTER SEQUENCE batting_id_seq OWNED BY batting.id;


--
-- Name: defense; Type: TABLE; Schema: public; Owner: codybarber
--

CREATE TABLE defense (
    id integer NOT NULL,
    player_id integer,
    "A" integer DEFAULT 0,
    "PO" integer DEFAULT 0,
    "E" integer DEFAULT 0,
    "defenseG" integer DEFAULT 0,
    fielding_perc double precision DEFAULT '0'::double precision
);


ALTER TABLE defense OWNER TO codybarber;

--
-- Name: defense_id_seq; Type: SEQUENCE; Schema: public; Owner: codybarber
--

CREATE SEQUENCE defense_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE defense_id_seq OWNER TO codybarber;

--
-- Name: defense_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codybarber
--

ALTER SEQUENCE defense_id_seq OWNED BY defense.id;


--
-- Name: pitching; Type: TABLE; Schema: public; Owner: codybarber
--

CREATE TABLE pitching (
    id integer NOT NULL,
    player_id integer,
    "IP" double precision DEFAULT '0'::double precision,
    "H_allowed" integer DEFAULT 0,
    "R_allowed" integer DEFAULT 0,
    "ER" integer DEFAULT 0,
    "BB_allowed" integer DEFAULT 0,
    "K_thrown" integer DEFAULT 0,
    "BF" integer DEFAULT 0,
    "G_pitched" integer DEFAULT 0,
    "W" integer DEFAULT 0,
    "L" integer DEFAULT 0,
    "S" integer DEFAULT 0,
    "CG" integer DEFAULT 0,
    "ERA" double precision DEFAULT '0'::double precision,
    "WHIP" double precision DEFAULT '0'::double precision,
    "HR_allowed" integer DEFAULT 0,
    run_support integer DEFAULT 0,
    "groundBalls_allowed" integer DEFAULT 0,
    "flyBalls_allowed" integer DEFAULT 0,
    "lineDrives_allowed" integer DEFAULT 0,
    "BIP" integer DEFAULT 0,
    "GBperc" double precision DEFAULT '0'::double precision
);


ALTER TABLE pitching OWNER TO codybarber;

--
-- Name: pitching_id_seq; Type: SEQUENCE; Schema: public; Owner: codybarber
--

CREATE SEQUENCE pitching_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE pitching_id_seq OWNER TO codybarber;

--
-- Name: pitching_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codybarber
--

ALTER SEQUENCE pitching_id_seq OWNED BY pitching.id;


--
-- Name: players; Type: TABLE; Schema: public; Owner: codybarber
--

CREATE TABLE players (
    id integer NOT NULL,
    player_name text,
    age integer,
    team_id integer,
    number integer
);


ALTER TABLE players OWNER TO codybarber;

--
-- Name: players_id_seq; Type: SEQUENCE; Schema: public; Owner: codybarber
--

CREATE SEQUENCE players_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE players_id_seq OWNER TO codybarber;

--
-- Name: players_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codybarber
--

ALTER SEQUENCE players_id_seq OWNED BY players.id;


--
-- Name: statters; Type: TABLE; Schema: public; Owner: codybarber
--

CREATE TABLE statters (
    id integer NOT NULL,
    username text,
    password text NOT NULL,
    email text NOT NULL
);


ALTER TABLE statters OWNER TO codybarber;

--
-- Name: statters_id_seq; Type: SEQUENCE; Schema: public; Owner: codybarber
--

CREATE SEQUENCE statters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE statters_id_seq OWNER TO codybarber;

--
-- Name: statters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codybarber
--

ALTER SEQUENCE statters_id_seq OWNED BY statters.id;


--
-- Name: teams; Type: TABLE; Schema: public; Owner: codybarber
--

CREATE TABLE teams (
    id integer NOT NULL,
    team_name text NOT NULL,
    level text,
    location text,
    sport text,
    statter_id integer
);


ALTER TABLE teams OWNER TO codybarber;

--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: public; Owner: codybarber
--

CREATE SEQUENCE teams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE teams_id_seq OWNER TO codybarber;

--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: codybarber
--

ALTER SEQUENCE teams_id_seq OWNED BY teams.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY auth_tokens ALTER COLUMN id SET DEFAULT nextval('auth_tokens_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY batting ALTER COLUMN id SET DEFAULT nextval('batting_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY defense ALTER COLUMN id SET DEFAULT nextval('defense_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY pitching ALTER COLUMN id SET DEFAULT nextval('pitching_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY players ALTER COLUMN id SET DEFAULT nextval('players_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY statters ALTER COLUMN id SET DEFAULT nextval('statters_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY teams ALTER COLUMN id SET DEFAULT nextval('teams_id_seq'::regclass);


--
-- Data for Name: auth_tokens; Type: TABLE DATA; Schema: public; Owner: codybarber
--

COPY auth_tokens (id, statter_id, auth_token) FROM stdin;
1	1	
2	1	iZ1zfLUgYBAvPf9zcjjEbMYZH2L48iYliONXbHWBI5pxzBeoIb6QsxZbWCUpu0tc
3	1	x09FAHWCgBuF9g6a2UJ3c8ZNr1huwaBTxJdM8HegJaQEwsT9ILadAieJVzM93Jmz
4	1	SWxDuvRmYXx96xySSAvao5qyiAhBRv6mioaUIIwltwg5pWgVTEVYNxEMLcwF2gGd
5	1	i6dLAouhpai5MeosHY7c1ydEoK1WRLB1E2nFmAMLJg0ksc0B0EhMdK0rMRwKxfSH
6	1	DopTWYNpEZZWFffCitC47mPOdrZLDV2NOmZdMCdnGPWuckWigJ2NJK9Hi9ENde0l
7	1	tqItmxvsMXCTDxS2rAB4yyOsi6zgoT1c69ejRzLt2J9zEGvIhrNOIxRdDa2bvwDp
8	1	b2K4I0xPryvDaYyj5YeMevkTwk161HhOCkLzHgQ84Pv86QpxBV1nqEuCvfKcCgg8
9	1	FWSppZ7p8p0nPlrYDHOgdSFxnOaqbfWXqrYArYKpeaaVghEpLpsSwMJlSemHr39H
10	1	fkF2v2AZiwdm9unsEcB1IJm3cyy7gSFSQRZ4zoeJpQObCymsJJ2iLhqzeyvBXaH2
11	1	nanySCKfuW29ZL04LriJhpqE7D9edQ36do3X9fem2VCst62aFrtaFZ93yC2w8K74
12	1	zcwFFBRkQnPv85XNI2eq0Nbyade7PKZqXYyHi4K1K9dieOkfVJMIi4kKNNT3RwoM
13	1	8u4DCSfDe8mMdCzwkcrR8Ph2v9XRiqrGXgASf2iCNjZzBb5wGWChjGxMJYVOFiOs
14	1	tRmqE51zbBtkiUSMrN4ziWhPAEgdYxY8QFvbU9IFPZ7T69f4cq7EU0f42sl2L27D
15	1	Lkiwrfq03GeNTGGi9xWxfVVYvZpOacoUzCfrwqabzfvWEssZ6b6RnQLkhJzJuh8A
16	1	awmjX8xicGxlgwKYAThVDtW5ZliRyRTXAjuy5WzRJsQdlhEXbqbcpGD8tWCsO2MA
17	1	b5z3phDfjJlzfFHrCbpmfHFXGrL16suoJAhkXCoPkca91gyaljr8iNfpZZP268w8
18	1	UggtrofGCxNTYNAYWas3ikA2rG6VCdZxdnZtrVdkt1MWPkVRu9jl1lEqybGVzafa
19	1	JcA6wOhtHm8khSylmof80SE1A6M8kihg6ZXCvrO42mS6L0UzYHMG5tGh2AUvcYGy
20	1	xYVA2gSOv7YT2P61eEEpbGBbhda7Wn9Ao1polp4ZIxM5ur3pniGZd97fZ6oxAnqC
21	1	RRbnEIetrMbzB4ZtaaxtIk5w8MMgZf3ypK4KAtKGCDDQ3wg610PgtmviJZsMXoHT
22	1	3EXZ1EZ42tWVQlRtUA7NXzBBOg44J1jgYdBI1xKa0zdWwVTtVYe3GUhUAksOyRni
23	1	poV6CGMMVACT3b5y9KrMgDvcdvAxfe8evxKlaxvM5ghdc7Su5zxeMFCImG4Pi61F
24	1	Y4RHGxbJJrC9zbdUvSFZhOtf8EPw20Jv1qHrZaT74XDnsuL5vY7sTj9XHUs2hLoL
25	1	zccS2Xm5bqrdlkbgkgbOz0NGSPVnYw7qclSkounn4OgR376niopKOEO9rsqZysH1
26	1	3dKmPF6usbIXtBjirjkmDBBGL0wLQUGfc2CJCJ1TuHctJH5P8PHq5CrE2WitPtxf
27	1	s0xNcWfSaDlSMxYiALkQZyVtNyFU4U42uQo98wzlDD0FtpeYnqT8NStu0njYSxA1
28	1	0PODujQDaSF5MHL7Tdp3oEQq3KiBCZUItbQM2xaI38rTtbhBpXJcB0YBerSs6ky9
29	1	e28wRuSvBKwtPUWzMt2gj25gAePwfB8VGFEn5hwn6h2SuAEIQEL4ZkENsfOgERBf
30	1	twy5lLoCztFOTDKqAWpem0p4MABNSkpQdV7o2w7NURs6YLCs2eC7AEZD9os3DmOL
31	1	OTBKXMzEnyC0HVQ5G8DdLm6eEEzCt8A8Hr1ghQC8jMZp9ysYp7Iu8VXBjlLmkeBn
32	1	VNfJu1hETS9YP5jlX5qVlWBUFAF3iKCpQmia40bzrr8d8AXPErXlofy9JlSjJCAx
33	1	Al3TP4wM5nWnCKNRdsILmFOU2dS2lo6wxbLWV7jyterztIH3hoD04fphvRYddqja
34	4	ZUIHIu3xqpDSzepSYB1pJGeXOrnsDQxaT4aPNvxwtM1yrIc7Cqyxj9HVkwpfBylF
35	1	x9amh3RluEuVxsLy1zWMQL6cAWYzbpECkohr56ckM5EENq6q9KkX4L0FgMebNYD1
36	1	U4dkghJ1HtjfqIheslxcrHn15bLNkNs6OXQ9k0Bku4tehzV1bxb7JZc94GJI3qu6
37	1	YX66GMNyjQpzKDHHsDkdrmfgdt0QeVBY33lvLDUKZdoWfQjKNcMVx32DWF3eZcLj
38	1	YdT21XrxCwvQw0ZihluDOb38Ae11oPdXVfUt2LxeXW4nDMur9z13TLXXLQ84lcRC
39	1	1n2S5prFTvBvlNJvhuz4yVdfIx2VprSXXwYT1BMCXEt1IYttl21p2FKEpfwTNDKp
40	1	7gtHc2JWNyjIgpQvzIq1Zf0RRZoXmg3rsL0gZK7roVkmeC1CD9cMyDkUz2KSRhj9
41	1	8VDk7P3h27g3ATPDv2JiLzCIEyDUeWdY5LKbnhiXMbKVF1Vn4YVimDMHkRtUOvPI
42	1	MfSJuhWtTk95LYW8Jf5DIj9RVakTQHRyXx7eR0cd61AHfrLb60fG34cRulMwIuWH
43	1	ZfS4GTmZME2WKjMuOA0l7nrs6QcKRB9DPFeYsjGnfh5QMNIC3dd90Or8KNbE9Ctp
44	1	KTfECKVSpo74jTpwtWQlijuzxP9dzfvA2w4ItGJDmQTPNYM6Zl4OKxhIM3X0xIpN
45	1	j8HKUcx2HTVqWDHBsNRnmL2mZzaYUZDPAy7rObAb6odXsSNMupCxR5zx1M78kIn5
46	1	MyIqQpb5JU0YfR3dBx9cK5Y6uqk43VuNabmWKhSqaVPuyDfBLwRYBNItrupsULxX
47	1	2AG6JTjqCmck1OzCv3yKf7d2OTTvILEF3TRVnN9AOrS9x8zjGzdvJXSB15ZIJ1HP
48	1	FeXz9jbBS5zCavT8bUgTpzMLBI3Vb13VAb7l5UqCHAqFeDoQY0RgZ1yDaIxybs8N
49	1	p5hvDUa30DDIIrrlmhv4t3OopG9nOwxM6VnuLbmDxSgW3ZjuQXauYwB9FAWfXBMk
50	1	Wjnhp25NKz7FZej59APtNA93VWB0EsAg2csIBK29A4m7tGFGzCKyni6cSMeEwcYl
51	1	Gzzk0cxGhNpPliXfYFXC9A3pLzoIVZKe0u0K3eEPXR4dhBjWxo9Lp6rGExgvi2Lc
52	1	LrxqITuBorOE1pmAmcohVHhLfv8N2DkHz1PVwxwZWe7pEadl6t62jdlQPlpTtwZo
53	1	Chw2KblwwRWMHY4bdkCv0X8qlpfzlu8RcDWFEzFfO3xNl6J3dxheXWxm0BwGKrA3
54	1	C4XDscJhKNgIVQXdzBSAO3Wv7WScEuKVZU4nGB6TlJFqXvYl8IL9iGleyWj0xZBY
55	7	QPqu4Mx2kki5Bhnd6rZeR6g7AZZyssGQgF2YIgo3kKYPtVHWCjmVSsCqmGIHp8bX
56	7	TG6F8SF08MrX2sUarn89Vkqv7gSGB8oKiPsocnTV5SI2YNeAYYHYg4lnfwsBBQcN
57	7	IDB07mmBfQBrHBpvNFm7rDUsnElHme5n6BAqW4cK3uF0GZCLXumdkP0ciV4FxTbD
58	7	dj6DSdRjBnRoHZGzhaWdBWLrunbfc4IhyZpCDh9JyQwmmXEOVZHHc9IZ2WadeHHB
59	7	clIQgDq5yjucvF9Zeak8smHCZBGtXqe8hLRQnPfVwyydIPKHJqcUoAZ8fE6ShuEe
60	1	UpafNbfNgIWX9s97jTZnWwEoQjh2MwrtFZL3ZFSAXPvXyp1K1pMD1bHvVFVwdYAr
61	7	qLdpbd9iVGfwB1m4oa0MManGiuFewFXnj1yDcB19SHP0rR97wRmiECTH0q6mtDJU
62	1	qHFzNWAmZqJgMKP3trYcbhLaQ6eOLvR8VLxsvKZSGvV2xSZzXzU4yTyd0g8Q2xrd
63	8	tMy0LfRpDuBMELdNBzs6BT1M5UsjcZLBA8sQlpFIm8z65vYPHolOesThjcO8imrH
64	1	p8UpD6ybDs6R1ALMfy5rIrB9g7U1Lzer9fwsX2TIQbplkBHoUtam18weuilWpoSj
65	1	FoWsqUT2kEAoRu348ttAzYXvtT3MtWnUBJs4sEnZe3sIMrCyEos5g0ZNvwmU1M9s
66	9	Xn66CADFwnep2e3QbD1RaqW4mcMANqJeNHdG3ATkqaquht4VxxQ5SDl6mIJeVcSR
67	7	2j7X2gXC80V2Men9UCOoMINfIrAHc3VLeQq8NcHu6jozJkK82sw8gyn6gwsXDDnC
68	7	5Q0PCflHoSEWNOVS5kTeLaFWQEp7JjDWj3BTRadn6pWJky6D5eKl3hRqduHAhmUd
69	1	YWQBhjsVTSPq0sGZuW2oOKSDEIpysjVszGOtGnReBn5sXWPyRLVxLSpMougceX7b
\.


--
-- Name: auth_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: codybarber
--

SELECT pg_catalog.setval('auth_tokens_id_seq', 69, true);


--
-- Data for Name: batting; Type: TABLE DATA; Schema: public; Owner: codybarber
--

COPY batting (id, player_id, "AB", "PA", "H", "BB", "SO", "HR", doubles, triples, "G", "R", "BA", "OBP", "SLG", "OPS", "SB", "RBI", "CS", sacrifices, "HBP", ground_balls, fly_balls, line_drives, singles, "IBB", "BABIP", "BBperc", "SOperc", "ISO", "RC", "wOBA", "wRAA") FROM stdin;
134	233	5	0	5	5	5	5	5	5	2	5	0	0	0	0	5	5	5	5	5	5	5	5	5	5	0	0	0	0	0	0	0
137	234	4	0	4	4	4	4	4	4	1	4	0	0	0	0	4	4	4	4	4	4	4	4	4	4	0	0	0	0	0	0	0
140	236	10	0	10	10	10	10	10	10	2	10	0	0	0	0	10	10	10	10	10	10	10	10	10	10	0	0	0	0	0	0	0
139	235	15	0	15	15	15	15	15	15	3	15	0	0	0	0	15	15	15	15	15	15	15	15	15	15	0	0	0	0	0	0	0
147	238	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0
148	239	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0
149	240	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0
150	241	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0
151	242	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0
152	243	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0
153	244	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0
154	245	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0
156	247	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0
157	248	\N	0	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	0	0	0	0	0	0
155	246	352	\N	95	28	43	2	14	3	90	48	0	0	0	0	11	17	4	2	3	138	93	77	76	2	0	0	0	0	0	0	0
146	237	10	0	10	10	10	10	10	10	2	10	0	0	0	0	10	10	10	10	10	10	10	10	10	10	0	0	0	0	0	0	0
\.


--
-- Name: batting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: codybarber
--

SELECT pg_catalog.setval('batting_id_seq', 159, true);


--
-- Data for Name: defense; Type: TABLE DATA; Schema: public; Owner: codybarber
--

COPY defense (id, player_id, "A", "PO", "E", "defenseG", fielding_perc) FROM stdin;
61	233	14	12	12	4	0
68	234	0	0	0	0	0
69	235	0	0	0	0	0
70	236	0	0	0	0	0
71	237	0	0	0	0	0
72	238	0	0	0	0	0
73	239	0	0	0	0	0
74	240	0	0	0	0	0
75	241	0	0	0	0	0
76	242	0	0	0	0	0
77	243	0	0	0	0	0
78	244	0	0	0	0	0
79	245	0	0	0	0	0
81	247	0	0	0	0	0
82	248	0	0	0	0	0
80	246	26	492	8	121	0
\.


--
-- Name: defense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: codybarber
--

SELECT pg_catalog.setval('defense_id_seq', 82, true);


--
-- Data for Name: pitching; Type: TABLE DATA; Schema: public; Owner: codybarber
--

COPY pitching (id, player_id, "IP", "H_allowed", "R_allowed", "ER", "BB_allowed", "K_thrown", "BF", "G_pitched", "W", "L", "S", "CG", "ERA", "WHIP", "HR_allowed", run_support, "groundBalls_allowed", "flyBalls_allowed", "lineDrives_allowed", "BIP", "GBperc") FROM stdin;
75	233	10	10	10	10	10	10	10	2	2	0	0	2	0	0	10	10	10	10	10	0	0
78	234	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
79	235	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
80	236	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
81	237	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
82	238	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
83	239	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
84	240	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
85	241	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
86	242	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
87	243	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
88	244	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
89	245	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
90	246	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
91	247	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
92	248	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
\.


--
-- Name: pitching_id_seq; Type: SEQUENCE SET; Schema: public; Owner: codybarber
--

SELECT pg_catalog.setval('pitching_id_seq', 92, true);


--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: codybarber
--

COPY players (id, player_name, age, team_id, number) FROM stdin;
233	testing	22	149	22
234	toby	22	149	21
235	jake	31	149	87
236	max	23	149	0
237	Hillary	34	150	33
238	asdgfsdgf	22	150	22
239	asfads	22	150	23
240	asdfad	33	150	21
241	asdfadsf	55	150	55
242	sadfdgr	11	150	11
243	fdhfdgjhg	55	150	44
244	hood cat	100	151	69
245	belle	11	151	65
246	Ender Inciarte	25	152	2
247	Freddie Freeman	26	152	1
248	Jace Peterson	26	152	19
\.


--
-- Name: players_id_seq; Type: SEQUENCE SET; Schema: public; Owner: codybarber
--

SELECT pg_catalog.setval('players_id_seq', 248, true);


--
-- Data for Name: statters; Type: TABLE DATA; Schema: public; Owner: codybarber
--

COPY statters (id, username, password, email) FROM stdin;
1	codybarber	123	cody@gmail.com
4	hillarya	123	hill@gmail.com
7	deedee12	123	dee@dee.com
8	hillary	123	hillaryahunter@gmail.com
9	test	123	test@test.com
\.


--
-- Name: statters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: codybarber
--

SELECT pg_catalog.setval('statters_id_seq', 9, true);


--
-- Data for Name: teams; Type: TABLE DATA; Schema: public; Owner: codybarber
--

COPY teams (id, team_name, level, location, sport, statter_id) FROM stdin;
149	codys	High School	Hawaii	Baseball	7
150	Atlanta United	Professional	Georgia	Baseball	1
151	hood cats	Little League	Georgia	Baseball	8
152	Atlanta Braves	Professional	Georgia	Baseball	9
\.


--
-- Name: teams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: codybarber
--

SELECT pg_catalog.setval('teams_id_seq', 152, true);


--
-- Name: auth_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY auth_tokens
    ADD CONSTRAINT auth_tokens_pkey PRIMARY KEY (id);


--
-- Name: batting_pkey; Type: CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY batting
    ADD CONSTRAINT batting_pkey PRIMARY KEY (id);


--
-- Name: batting_player_id_key; Type: CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY batting
    ADD CONSTRAINT batting_player_id_key UNIQUE (player_id);


--
-- Name: defense_pkey; Type: CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY defense
    ADD CONSTRAINT defense_pkey PRIMARY KEY (id);


--
-- Name: defense_player_id_key; Type: CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY defense
    ADD CONSTRAINT defense_player_id_key UNIQUE (player_id);


--
-- Name: pitching_pkey; Type: CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY pitching
    ADD CONSTRAINT pitching_pkey PRIMARY KEY (id);


--
-- Name: pitching_player_id_key; Type: CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY pitching
    ADD CONSTRAINT pitching_player_id_key UNIQUE (player_id);


--
-- Name: players_pkey; Type: CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);


--
-- Name: statters_email_key; Type: CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY statters
    ADD CONSTRAINT statters_email_key UNIQUE (email);


--
-- Name: statters_pkey; Type: CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY statters
    ADD CONSTRAINT statters_pkey PRIMARY KEY (id);


--
-- Name: statters_username_key; Type: CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY statters
    ADD CONSTRAINT statters_username_key UNIQUE (username);


--
-- Name: teams_pkey; Type: CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: auth_tokens_statter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY auth_tokens
    ADD CONSTRAINT auth_tokens_statter_id_fkey FOREIGN KEY (statter_id) REFERENCES statters(id);


--
-- Name: batting_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY batting
    ADD CONSTRAINT batting_player_id_fkey FOREIGN KEY (player_id) REFERENCES players(id);


--
-- Name: players_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY players
    ADD CONSTRAINT players_team_id_fkey FOREIGN KEY (team_id) REFERENCES teams(id);


--
-- Name: teams_statter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: codybarber
--

ALTER TABLE ONLY teams
    ADD CONSTRAINT teams_statter_id_fkey FOREIGN KEY (statter_id) REFERENCES statters(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

