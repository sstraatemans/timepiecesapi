SELECT 
N.nid,
N.title,
(
SELECT GROUP_CONCAT(DISTINCT CTC.field_countrycode_value) field_country_nid
  FROM content_field_country RA
  JOIN node CN ON CN.nid = field_country_nid
  JOIN content_type_country CTC ON CTC.nid = CN.nid AND CTC.vid = CN.vid
  where RA.nid = N.nid and RA.vid = N.vid 
 order by field_country_nid
) as countryCodes

,
(SELECT body
FROM node_revisions REV
WHERE REV.nid=N.nid and REV.vid = N.vid) as body

 FROM node N
where type = 'category'
and status = 1

;