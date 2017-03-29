SELECT 
N.nid,
N.title,
TA.field_name_first,
TA.field_name_middle,
TA.field_name_last,
(
SELECT GROUP_CONCAT(DISTINCT field_relatedartists_nid) field_relatedartists_nid
  FROM content_field_relatedartists RA
  where RA.nid = N.nid and RA.vid = N.vid 
 order by field_relatedartists_nid
) as related_artists,

(
SELECT field_memberships_value
  FROM content_field_memberships MEMBER
  where MEMBER.nid = N.nid and MEMBER.vid = N.vid 

) as memberships,

(
SELECT field_alias_value
  FROM content_field_alias ALIAS
  where ALIAS.nid = N.nid and ALIAS.vid = N.vid 

) as alias,

(
SELECT field_genre_value
  FROM content_field_genre GENRE
  where GENRE.nid = N.nid and GENRE.vid = N.vid 

) as genre,

(
SELECT field_website_value
  FROM content_field_website WEB
  where WEB.nid = N.nid and WEB.vid = N.vid 
) as website
,
(
SELECT field_wikilink_value
  FROM content_field_wikilink WIKI
  where WIKI.nid = N.nid and WIKI.vid = N.vid 
) as wikilink
,
(SELECT body
FROM node_revisions REV
WHERE REV.nid=N.nid and REV.vid = N.vid) as body,

(SELECT field_mid_value 
FROM content_field_mid MID
WHERE MID.vid = N.vid and MID.nid = N.nid) AS mid

 FROM node N
join content_type_artist TA on TA.nid = N.nid AND TA.vid = N.vid
where type = 'artist'
and status = 1

;