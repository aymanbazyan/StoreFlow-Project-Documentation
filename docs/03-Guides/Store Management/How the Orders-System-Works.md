# Orders System

### Order Statuses

| Awaiting Approval | In Transit | Delivered | Cancelled | Rejected |
| :---------------- | :--------- | :-------- | :-------- | :------- |

---

### Order Management Lifecycle

```mermaid
graph TD;
    subgraph "Order Placement"
        A[Customer Places Order] --> B(Status: Pending Approval <br/> Invoice Generated <br/> Stock Decremented);
    end

    subgraph "Admin Review"
        B --> |Admin Approves| C{Status: Approved <br/> Stock Decremented};
        B --> |Admin Rejects| D(Status: Rejected);
        B --> |Customer Cancels| E(Status: Cancelled);
    end

    subgraph "Fulfillment"
        C --> F(Status: In Transit);
        F --> |Admin Rejects| D;
        F --> |Delivery Confirmed| G(Status: Delivered);
    end

    subgraph "Post-Delivery & Resolution"
        G --> |Customer Initiates Return| H{Return Requested};
        H --> |Admin Approves Return| I(Status: Rejected <br/> Stock Incremented);
        H --> |Admin Rejects Return| G;

        D --> Z(Items Returned to Stock);
        E --> Z;
        I --> Z;
    end

    style A fill:#cde4ff
    style G fill:#d4edda
    style D fill:#f8d7da
    style E fill:#f8d7da
    style I fill:#fff3cd
```

---

_Last updated on June 24, 2025 by Ayman._
