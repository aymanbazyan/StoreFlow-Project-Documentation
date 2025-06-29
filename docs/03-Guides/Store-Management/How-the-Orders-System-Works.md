# Orders System

### Order Statuses

| Awaiting Approval | In Transit | Delivered | Cancelled | Rejected | Returned |
| :---------------- | :--------- | :-------- | :-------- | :------- | :------- |

---

### Order Management Lifecycle

```mermaid
graph TD;

    subgraph "Order Placement"
        A[Customer Places Order] --> Y(Invoice Generated <br/> Stock Decremented)--> B(Status: Pending Approval);
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
        H --> |Yes| K;
        H --> |No| G;

        E --> Z;
        D --> Z;
        K(Status: Returned) -->Z

        Z(Items Returned to Stock)
    end

    style A fill:#cde4ff
    style B fill:#FFF176
    style F fill:#FFF176
    style G fill:#d4edda
    style D fill:#f8d7da
    style E fill:#f8d7da
    style K fill:#f8d7da
```

:::note
Only the financial report will change if you delete a `Delivered` Order log, but the item's quantity & selling counter won't change, you must reject the order to change the items' quantites & sold items counter.
:::

---

_Last updated on June 29, 2025 by Ayman._
