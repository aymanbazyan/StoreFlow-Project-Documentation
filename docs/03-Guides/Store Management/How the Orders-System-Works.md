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
        B --> |Admin Approves| F(Status: In Transit);
        B --> |Admin Rejects| D(Status: Rejected);
        B --> |Customer Cancels| E(Status: Cancelled);
        Z(Items Returned to Stock)

    end

    subgraph "Fulfillment"
        F --> |Delivery Confirmed| G(Status: Delivered);
        F --> |Admin Rejects| D;

    end

    subgraph "Post-Delivery & Resolution"
        G --> |Customer asks to Return -In the real world-| H{Does the Admin accept to return the products?};
        H --> |Yes| D;
        H --> |No| G;

        E --> Z;
        D --> Z;
        Z(Items Returned to Stock)

    end

    style A fill:#cde4ff
    style G fill:#d4edda
    style D fill:#f8d7da
    style E fill:#f8d7da
```

---

_Last updated on June 24, 2025 by Ayman._
