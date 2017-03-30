SELECT 
N.nid,
N.title,
Chart.field_category_nid as categoryId,


(
SELECT GROUP_CONCAT(DISTINCT CA.field_album_nid order by delta) field_album_nid
  FROM content_field_album CA
  where CA.nid = N.nid and CA.vid = N.vid 
 
) as tracks,

(
SELECT YN.title
  FROM content_field_yearnode Y
  JOIN node YN ON Y.field_yearnode_nid = YN.nid
  where Y.nid = N.nid and Y.vid = N.vid 
) as year

,
(SELECT body
FROM node_revisions REV
WHERE REV.nid=N.nid and REV.vid = N.vid) as body

 FROM node N
 join content_type_chart Chart ON Chart.vid = N.vid and Chart.nid=N.nid
where type = 'chart'
and status = 1;