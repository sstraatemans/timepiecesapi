SELECT 
N.nid,
N.title,
Album.field_artist_nid as artistId,
Album.field_itunes_value as itunes,
Album.field_asin_value as amazon,
Album.field_spotify_value as spotify,

(
SELECT YN.title
  FROM content_field_yearnode Y
  JOIN node YN ON Y.field_yearnode_nid = YN.nid
  where Y.nid = N.nid and Y.vid = N.vid 
) as year
,

(
SELECT field_genre_value
  FROM content_field_genre GENRE
  where GENRE.nid = N.nid and GENRE.vid = N.vid 

) as genre

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
 join content_type_album Album ON Album.vid = N.vid and Album.nid=N.nid
where type = 'album'
and status = 1

;