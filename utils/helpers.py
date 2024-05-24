

def get_page_range(page, size):
    print(f"page and size: {page}-{size}")
    return (
        (page-1)*size,
        page*size,
    )