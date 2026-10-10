## About the Distance Calculator

Our **Distance Calculator** finds the straight-line (Euclidean) distance between two points in a coordinate plane — a concept used in geometry, navigation, computer graphics, and data science.

---

## The Distance Formula

Derived directly from the Pythagorean theorem, the distance between points $(x_1, y_1)$ and $(x_2, y_2)$ is:

$$ d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} $$

**Example:** Find the distance between $(1, 2)$ and $(5, 5)$:
$$ d = \sqrt{(5-1)^2 + (5-2)^2} = \sqrt{16 + 9} = \sqrt{25} = 5 $$

### In 3D Space (Three-Dimensional Distance)
$$ d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2} $$

---

## GPS Distance (Haversine Formula)

To find the real-world distance between two GPS coordinates (latitude/longitude), you cannot use the flat-plane formula because the Earth is a sphere. The Haversine formula accounts for Earth's curvature:

$$ d = 2r \arcsin\left(\sqrt{\sin^2\left(\frac{\phi_2-\phi_1}{2}\right) + \cos\phi_1\cos\phi_2\sin^2\left(\frac{\lambda_2-\lambda_1}{2}\right)}\right) $$

Where $r$ = 6,371 km (Earth's mean radius), $\phi$ = latitude, $\lambda$ = longitude (in radians).

---

## Frequently Asked Questions

**What is Manhattan distance?**
Manhattan distance (also called taxicab distance) measures the total distance traveled along grid lines (horizontal + vertical), like a taxi in a city grid. It does NOT take the diagonal shortcut. $d = |x_2-x_1| + |y_2-y_1|$.

**What is Euclidean distance used for in data science?**
In machine learning, Euclidean distance measures how similar two data points are in multi-dimensional feature space. It is the core metric in K-Nearest Neighbors (KNN) classification and K-Means clustering.
