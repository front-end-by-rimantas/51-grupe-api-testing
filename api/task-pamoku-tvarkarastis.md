# API: Pamoku tvarkarastis

## GET: /api/schedule

-   gauti visos savaites pamoku tvarkarasti
-   grazinamu duomenu pavyzdys:

```json
{
    "schedule": [
        ["Pirmadienio pirma pamoka", "Pirmadienio antra pamoka"],
        ["Antradienio pirma pamoka", "Antradienio antra pamoka"],
        ["Treciadienio pirma pamoka", "Treciadienio antra pamoka"],
        ["Ketvirtadienio pirma pamoka", "Ketvirtadienio antra pamoka"],
        ["Penktadienio pirma pamoka", "Penktadienio antra pamoka"],
        [],
        []
    ]
}
```

## GET: /api/schedule/:dienos-id

-   pvz.: `GET: /api/schedule/1`

```json
{
    "schedule": ["Pirmadienio pirma pamoka", "Pirmadienio antra pamoka"]
}
```

-   pvz.: `GET: /api/schedule/6`

```json
{
    "schedule": []
}
```

## POST: /api/schedule

```json
{
    "schedule": [
        ["Pirmadienio pirma pamoka", "Pirmadienio antra pamoka"],
        ["Antradienio pirma pamoka", "Antradienio antra pamoka"],
        ["Treciadienio pirma pamoka", "Treciadienio antra pamoka"],
        ["Ketvirtadienio pirma pamoka", "Ketvirtadienio antra pamoka"],
        ["Penktadienio pirma pamoka", "Penktadienio antra pamoka"],
        [],
        []
    ]
}
```

## PUT: /api/schedule/:dienos-id

-   pvz.: `PUT: /api/schedule/1`

```json
{
    "schedule": ["Pirmadienio pirma pamoka", "Pirmadienio antra pamoka"]
}
```

## PATCH: /api/schedule/:dienos-id/:pamokos-id

-   pvz.: `PATCH: /api/schedule/1/2` (pirmadienio antra pamoka)

```json
{
    "lesson": "Nauja pirmadienio antroji pamoka"
}
```

## DELETE: /api/schedule/:dienos-id
