## Distance Calculator — 2D, 3D, and by Latitude/Longitude

The distance between two points is one of the most fundamental calculations in mathematics, physics, geography, and everyday life. This calculator handles all three common scenarios: flat-plane (2D), three-dimensional space (3D), and real-world geographic distance using latitude and longitude coordinates.

---

## 2D Distance Formula

The **2D Distance Formula** — also called the Euclidean distance formula — calculates the straight-line distance between two points on a flat coordinate plane. It is derived directly from the Pythagorean Theorem.

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

**Step-by-step example:**
Find the distance between Point A $(1, 2)$ and Point B $(4, 6)$.

1. Calculate the horizontal difference: $\Delta x = 4 - 1 = 3$
2. Calculate the vertical difference: $\Delta y = 6 - 2 = 4$
3. Apply the formula: $d = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = \mathbf{5}$

This is the classic 3-4-5 right triangle. Notice that the horizontal and vertical differences form the two legs of a right triangle, and the straight-line distance is the hypotenuse.

---

## 3D Distance Formula

When working in three-dimensional space (like in physics, engineering, or 3D game development), a third coordinate $z$ is added to the formula.

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$$

**Example:**
Find the distance between Point A $(1, 2, 3)$ and Point B $(4, 6, 3)$.

$$d = \sqrt{(4-1)^2 + (6-2)^2 + (3-3)^2} = \sqrt{9 + 16 + 0} = \sqrt{25} = \mathbf{5}$$

When the $z$ coordinates are identical, the 3D formula gives the same answer as 2D. The extra dimension only adds to the distance when there is a difference in depth.

---

## Distance by Latitude and Longitude (Haversine Formula)

When you need to find the real-world distance between two geographic locations on Earth (like the distance between New York and London), you cannot use the simple Euclidean formula. The Earth is not a flat plane — it is a sphere. You must account for its curvature.

The standard formula used for this is the **Haversine Formula**, which calculates the **great-circle distance** (the shortest path along the surface of a sphere) between two points given their latitude and longitude.

$$a = \sin^2\!\left(\frac{\Delta\varphi}{2}\right) + \cos\varphi_1 \cdot \cos\varphi_2 \cdot \sin^2\!\left(\frac{\Delta\lambda}{2}\right)$$

$$c = 2 \cdot \arctan2\!\left(\sqrt{a},\, \sqrt{1-a}\right)$$

$$d = R \cdot c$$

Where:
- $\varphi$ = Latitude in radians
- $\lambda$ = Longitude in radians
- $R$ = Earth's mean radius = **6,371 km**

**Real-world example:**
- **New York City:** Lat 40.7128°N, Lon 74.0060°W
- **Los Angeles:** Lat 34.0522°N, Lon 118.2437°W

Plugging these into the Haversine formula gives a great-circle distance of approximately **3,940 km** (or **2,448 miles**). This is the straight-line distance through the air, not the driving distance (which would be much longer due to roads and terrain).

---

## Great-Circle Distance vs. Driving Distance

The Haversine formula gives you the **great-circle distance** — the shortest possible path between two points, as if you could fly in a perfectly straight line through the air.

This is different from:
- **Driving distance:** The distance along actual roads, which follows curves and detours.
- **Manhattan distance:** Used in grid-based city navigation, calculated as $|x_2 - x_1| + |y_2 - y_1|$ (the total of horizontal + vertical movement only, no diagonals).

For travel planning, always use a mapping tool for driving distances. The Haversine formula is best for aviation, shipping, and geographic analysis.

---

## Distance in a Coordinate System

On a standard 2D Cartesian plane, the distance formula maps perfectly to the Pythagorean theorem. The horizontal difference $\Delta x = x_2 - x_1$ and the vertical difference $\Delta y = y_2 - y_1$ form the two legs of a right triangle, and $d$ is the hypotenuse.

This relationship is why the formula works:

$$a^2 + b^2 = c^2 \quad \Rightarrow \quad (\Delta x)^2 + (\Delta y)^2 = d^2 \quad \Rightarrow \quad d = \sqrt{(\Delta x)^2 + (\Delta y)^2}$$

---

## Common Applications

| Use Case | Mode |
|---|---|
| Math class coordinate geometry | 2D |
| Physics problems (projectile motion endpoints) | 2D / 3D |
| Video game level design | 3D |
| Flight path planning | Lat/Lon |
| Shipping route optimization | Lat/Lon |
| Finding nearest stores or restaurants | Lat/Lon |
| GPS and mapping applications | Lat/Lon |
| Robotics and automation path planning | 3D |

---

## Frequently Asked Questions

### What is Euclidean distance?
Euclidean distance is the standard straight-line distance formula derived from the Pythagorean theorem. It works on any flat (Cartesian) coordinate plane in any number of dimensions. For 2D: $d = \sqrt{(\Delta x)^2 + (\Delta y)^2}$. For 3D: $d = \sqrt{(\Delta x)^2 + (\Delta y)^2 + (\Delta z)^2}$.

### What is the Haversine formula?
The Haversine formula is a trigonometric equation that calculates the great-circle distance between two points on a sphere, given their latitudes and longitudes. It is the standard formula used in GPS systems, aviation, and all geographic mapping software. It is accurate to within about 0.5% for Earth distances.

### How do I find distance in meters instead of km?
The Lat/Lon mode always outputs in kilometers, miles, and nautical miles. If you need meters, multiply the km result by 1,000.

### Is the Haversine formula always the best choice for Earth distances?
For most purposes, yes. It is simple, fast, and accurate to within 0.5%. For extremely high-precision applications (long-range missile targeting, geodetic surveying, satellite positioning), the **Vincenty formula** is preferred, as it models Earth as an oblate spheroid (slightly flattened at the poles) rather than a perfect sphere. The difference is less than 0.3% for most distances.

### Can I calculate distance between more than two points?
This calculator handles pairs of points. For a multi-point route (e.g., A to B to C to D), you would calculate each leg separately and sum the results. For example: $d_{total} = d(A,B) + d(B,C) + d(C,D)$.

### What is the difference between 2D and 3D distance?
2D distance is the flat, planar distance — the distance you would measure on a map or piece of graph paper. 3D distance includes a depth ($z$) coordinate, which is critical in physics (height, elevation), computer graphics, and engineering. If the $z$ coordinates of both points are equal, the 3D formula gives the exact same result as the 2D formula.

### Why is driving distance longer than the calculated distance?
The Haversine formula gives the "as-the-crow-flies" distance — the shortest possible straight-line path through the air. Driving requires following road networks, which curve around obstacles, follow terrain contours, and must connect to existing infrastructure. A drive that is 400 km by road might be only 280 km in a straight line.
