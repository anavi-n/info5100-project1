women = read.csv("data/WomenInWorkforce.csv",header = TRUE)
population = read.csv("data/WorldPopulation.csv",header = TRUE)

population = population[-1,]
population = population[c(1,10)]

names(population)[2] = c("population") 

write.csv(population, file = "data/Population.csv",row.names=TRUE)
