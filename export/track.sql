SELECT 
N.nid,
N.title,
TT.field_number_value as track,
TT.field_duration_value as duration,
TT.field_trackonalbum_nid as albumId,

(SELECT field_mid_value 
FROM content_field_mid MID
WHERE MID.vid = N.vid and MID.nid = N.nid) AS mid

 FROM node N
JOIN content_type_track TT ON TT.nid = N.nid
where type = 'track'
and status = 1
ORDER BY albumId, track

;