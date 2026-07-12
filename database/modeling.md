# Schema Design — Inventory System

## 1. Collection Overview

- **device** — stores all about the devices, ie printers, switches, personal computers etc. All of them can be differentiated by their device_type and specs.
- **person** — stores all employees as an separate entity.
- **department** — stores departments as a single module so that a single room can be mapped to specific person.
- **device_logs** — logs every moment, either the device is attached or deattached, department transfer, fault/repair, status change.

---

## 2. Document Shapes

### device

```
{
    _id: ObjectId,
    device_type: string (required),
    is_shared: bool (required),
    manufacturer: string (required),
    model: string (required),
    status: 
        enum{'dispatched', 'in-use', 'spare'} (required),
    specs: { ... },
    assignment: { ... },
    created_at: Date (required),
    updated_at: Date (required)
}
```

### as personal device(ie computer)
```
specs: {
    cpu: string (required),
    ram_gb: int (required),
    disk_type: enum(SSD, HDD) (required),
    storage_gb: int (required),
    os: string (required),
    ip_address: string (optional),
    mac_address: string (optional)
},
assignment: {
    user_id: ObjectId (required),
    department_id: ObjectId (required),
    location_id: ObjectId (required),
    section_id: ObjectId (required),
    room_id: ObjectId (optional),
    cabin_id: ObjectId (optional),
    assigned_date: Date (required)
}
```
### as shared device

```
specs: {
    technology: string (required),
    color: bool (required), # for printers
    ppm_speed: string (optional),
    paper_capacity: int (required),
    duplex: bool (required),
    ip_address: string (optional),
    mac_address: string (optional)
},
assignment: {
    department_id: ObjectId (required),
    location_id: ObjectId (required),
    section_id: ObjectId (required),
    room_id: ObjectId (optional),
    cabin_id: ObjectId (optional),
    shared_users: [ObjectId] (optional),
    assigned_date: Date (optional)
}
```

## device_logs

```
{
    _id: ObjectId,
    device_id: ObjectId (required),
    timestamp: Date (required),
    event_type: enum{'attach', 'detach', 'transfer', 'fault', 'status_change'} (required),
    user_id: ObjectId (optional), 
    detail: { ... }
}
```

### attach\detach

```

detail: {
    user_id: ObjectId (optional),
    room_id: ObjectId (optional),
    cabin_id: ObjectId (optional),
    # one of them is required.
    reason: string (required)
}
```

### transer

```

detail: {
    prev_depart_id: ObjectId (required),
    new_depart_id: ObjectId (required),
    prev_user_id: ObjectId (optional),
    new_user_id: ObjectId (optional),
    description: string (required)
}
```

### fault

```

detail: {
    issue: string (required),
    action_taken: string (optional),
}
```

### status_change

```
detail: {
    old_status: enum{'dispatched', 'in-use', 'spare', 'faulty', 'retired'} (required),
    new_status: enum{'dispatched', 'in-use', 'spare', 'faulty', 'retired'} (required),
    reason: string (required)
}
```

### departments

```
{
    _id: ObjectId,
    name: string (required),
    locations: [
        {
            _id: ObjectId,
            branch_location: string (required),
            sections: [
                {
                    _id: ObjectId,
                    name: string (required),
                    rooms: [
                        {
                            _id: ObjectId,
                            name: string (required),
                            person_ids: [ObjectId]
                        }
                    ],
                    cabins: [
                        {
                            _id: ObjectId,
                            name: string (required),
                            person_id: ObjectId (optional)
                        }
                    ]
                }
            ]
        }
    ]
}

```

### person

```
{
    _id: ObjectId,
    name: {
        first_name: string (required),
        last_name: string (required)
    },
    father_name: {
        first_name: string (required),
        last_name: string (required)
    },
    designation: string (required),
    p_number: string (required),
    address: {
        street_no: string (required),
        town: string (required),
        city: string (required),
        province: string (required),
        country: string (required)
    },
    phone_numbers: [string] (required),
    email_addresses: [string] (required), 

    current_placement: {
        department_id: ObjectId (optional),
        location_id: ObjectId (optional),
        section_id: ObjectId (optional),
        room_id: ObjectId (optional),
        cabin_id: ObjectId (optional)
    }
}
```
