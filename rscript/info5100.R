# Female age range from 25 to 54
# percentage of country population
raw = read.csv("labor.csv", header = TRUE)

# Data cleaning
raw = raw[-190,]
raw = raw[,-30]

labor = raw
 
# 2000s (2000 - 2007)
X00 = apply(labor[,22:29], 1, mean)

labor[,"X00"] = X00

# Smallest 4
S4 = order(X00)[1:4]

# Largest 4
L4 = order(X00, decreasing = TRUE)[1:4]

for (i in 1:4){
  print(labor[,1][S4[i]])
}


for (i in 1:4){
  print(labor[,1][L4[i]])
}