# Specify the source files
file(GLOB_RECURSE SRC_FILES *.cpp)
file(GLOB_RECURSE HEADER_FILES *.h)

# Create the executable
add_executable(CQTSOG ${SRC_FILES} ${HEADER_FILES})

# Link libraries
target_link_libraries(CQTSOG ${LIBRARIES})
